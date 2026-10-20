CREATE DATABASE ejercicios;
USE ejercicios;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(150),
    ciudad VARCHAR(100)
);

INSERT INTO clientes (nombre, correo, ciudad) VALUES 
('Edgar', 'edgar@gmail.com', 'Querétaro'),
('Brandom', 'brandom@gmail.com', 'Morelia'),
('isabel', 'isabel@gmail.com', 'Hidalgo'),
('Eugenio', 'eugenio@gmail.com', 'Querétaro'),
('Ana', 'ana@gmail.com', 'Morelia');

SELECT * FROM clientes;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    producto_id INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    cantidad INT NOT NULL,
    fecha DATE NOT NULL
);

INSERT INTO productos (nombre, precio, stock) VALUES
('Mouse', 200.00,5),
('Celular', 16000.00,6),
('Libreta', 15.00,10),
('Pantalla', 12000.00,2),
('Libro', 150.00,10),
('Pelota', 10.00,20);

SELECT id, nombre FROM clientes;

SELECT id, nombre FROM productos;

INSERT INTO ventas (cliente_id, producto_id, cantidad, fecha) VALUES
(1,1,1,'2026-10-20'),
(1,2,1,'2026-10-21'),
(2,2,1,'2026-10-20'),
(3,5,4,'2026-10-20');

SELECT * FROM ventas;

SELECT * FROM productos;

SELECT * FROM clientes;

SELECT nombre, correo FROM clientes WHERE ciudad='Querétaro';

SELECT nombre, precio, stock FROM productos ORDER BY precio DESC LIMIT 5;

INSERT INTO productos (nombre, precio, stock) VALUES('Webcam',899,12);

SELECT id, nombre, stock FROM productos WHERE nombre = 'Webcam';

UPDATE productos SET stock=10 WHERE id=10;

DELETE FROM productos WHERE id=9;

SELECT ventas.id, ventas.fecha, clientes.nombre AS cliente, productos.nombre AS producto, ventas.cantidad FROM ventas 
JOIN clientes ON ventas.cliente_id = clientes.id
JOIN productos ON ventas.producto_id = productos.id;

SELECT clientes.nombre, SUM(ventas.cantidad * productos.precio) AS total FROM clientes
JOIN ventas ON clientes.id = ventas.cliente_id
JOIN productos ON ventas.producto_id = productos.id
GROUP BY clientes.id, clientes.nombre
ORDER BY total DESC;




