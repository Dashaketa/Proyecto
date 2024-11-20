const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const fs = require("fs"); // Importar el módulo fs
const https = require("https"); // Importar el módulo https

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = new sqlite3.Database("./user_management_db.db", (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");

    // Crear la tabla de usuarios si no existe
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS users (
                usuario TEXT PRIMARY KEY,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                tipoUsuario TEXT NOT NULL,
                fechaNacimiento TEXT NOT NULL,
                contrasena TEXT NOT NULL
            )`,
        (err) => {
          if (err) {
            console.error("Error al crear la tabla:", err.message);
          }
        }
      );
    });
  }
});
// Crear la tabla de clases si no existe
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS clases (
      idClase INTEGER PRIMARY KEY AUTOINCREMENT,
      nombreClase TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error al crear la tabla 'clases':", err.message);
      }
    }
  );
});

// Ruta para registrar un usuario
app.post("/api/register", (req, res) => {
  const {
    usuario,
    nombre,
    apellido,
    tipoUsuario,
    fechaNacimiento,
    contrasena,
  } = req.body;
  if (
    !usuario ||
    !nombre ||
    !apellido ||
    !tipoUsuario ||
    !fechaNacimiento ||
    !contrasena
  ) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }
  const sql = `INSERT INTO users (usuario, nombre, apellido, tipoUsuario, fechaNacimiento, contrasena) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [usuario, nombre, apellido, tipoUsuario, fechaNacimiento, contrasena],
    function (err) {
      if (err) {
        // Manejo de error si el usuario ya existe
        if (err.code === "SQLITE_CONSTRAINT") {
          return res
            .status(400)
            .json({ error: "El nombre de usuario ya está en uso" });
        }
        res.status(500).json({ error: err.message });
      } else {
        res
          .status(201)
          .json({ message: "Usuario registrado", id: this.lastID });
      }
    }
  );
});
// Ruta para eliminar un usuario por su nombre de usuario
app.delete("/api/users/:usuario", (req, res) => {
  const { usuario } = req.params; // Obtener el nombre de usuario de los parámetros de la URL

  const sql = `DELETE FROM users WHERE usuario = ?`;
  db.run(sql, [usuario], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: `Usuario ${usuario} eliminado correctamente` });
  });
});
// Ruta para obtener todos los usuarios
app.get("/api/users", (req, res) => {
  const sql = `SELECT * FROM users`; // Consulta para obtener todos los usuarios
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Devuelve la lista de usuarios
  });
});

// Ruta para iniciar sesión
app.post("/api/login", (req, res) => {
  const { usuario, contrasena } = req.body;

  const sql = `SELECT * FROM users WHERE usuario = ? AND contrasena = ?`;

  db.get(sql, [usuario, contrasena], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    res.json({
      message: "Inicio de sesión exitoso",
      usuario: row.usuario,
      nombre: row.nombre,
      apellido: row.apellido,
      tipoUsuario: row.tipoUsuario,
      fechaNacimiento: row.fechaNacimiento,
    }); //res.json({ message: "Inicio de sesión exitoso", usuario: row });
  });
});
// Ruta para actualizar un usuario
app.put("/api/users/:usuario", (req, res) => {
    const { usuario } = req.params; // Obtener el nombre de usuario de los parámetros de la URL
    const {
      nombre,
      apellido,
      tipoUsuario,
      fechaNacimiento,
      contrasena,
    } = req.body;
  
    // Construir una consulta para actualizar solo los campos proporcionados
    const fieldsToUpdate = [];
    const values = [];
  
    if (nombre) {
      fieldsToUpdate.push("nombre = ?");
      values.push(nombre);
    }
    if (apellido) {
      fieldsToUpdate.push("apellido = ?");
      values.push(apellido);
    }
    if (tipoUsuario) {
      fieldsToUpdate.push("tipoUsuario = ?");
      values.push(tipoUsuario);
    }
    if (fechaNacimiento) {
      fieldsToUpdate.push("fechaNacimiento = ?");
      values.push(fechaNacimiento);
    }
    if (contrasena) {
      fieldsToUpdate.push("contrasena = ?");
      values.push(contrasena);
    }
  
    // Si no hay campos para actualizar, devuelve un error
    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ error: "No se proporcionaron campos para actualizar." });
    }
  
    // Agregar el nombre de usuario al final de los valores
    values.push(usuario);
  
    // Crear la consulta SQL
    const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE usuario = ?`;
  
    db.run(sql, values, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json({ message: `Usuario ${usuario} actualizado correctamente` });
    });
  });
// Ruta para obtener todas las clases
app.get("/api/clases", (req, res) => {
  const sql = `SELECT * FROM clases`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Ruta para agregar una nueva clase
app.post("/api/clases", (req, res) => {
  const { nombreClase } = req.body;

  if (!nombreClase) {
    return res.status(400).json({ error: "El nombre de la clase es requerido." });
  }

  const sql = `INSERT INTO clases (nombreClase) VALUES (?)`;
  db.run(sql, [nombreClase], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Clase creada", idClase: this.lastID });
  });
});

// Ruta para eliminar una clase por su ID
app.delete("/api/clases/:idClase", (req, res) => {
  const { idClase } = req.params;

  const sqlDelete = `DELETE FROM clases WHERE idClase = ?`;
  db.run(sqlDelete, [idClase], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Clase no encontrada" });
    }

    // Reiniciar el contador de autoincremento después de eliminar la clase
    const sqlReset = `DELETE FROM sqlite_sequence WHERE name='clases'`;
    db.run(sqlReset, function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error al reiniciar el contador de autoincremento: ' + err.message });
      }

    res.json({ message: `Clase con ID ${idClase} eliminada correctamente` });
  });
});
});
// Cargar los archivos del certificado y clave privada
const privateKey = fs.readFileSync("../ssl/server_nopass.key", "utf8");
const certificate = fs.readFileSync("../ssl/server.crt", "utf8");
// Configurar el servidor HTTPS
const credentials = { key: privateKey, cert: certificate };
// Iniciar el servidor HTTPS
https.createServer(credentials, app).listen(port, () => {
  console.log(`Servidor HTTPS escuchando en https://localhost:${port}`);
});
