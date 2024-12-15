BEGIN TRANSACTION;

-- Cleanup scripts
DELETE FROM Sales;
DELETE FROM Discounts;
DELETE FROM Customers;
DELETE FROM Salespersons;
DELETE FROM Products;

-- Reset identity seeds
DBCC CHECKIDENT ('Products', RESEED, 0);
DBCC CHECKIDENT ('Salespersons', RESEED, 0);
DBCC CHECKIDENT ('Customers', RESEED, 0);
DBCC CHECKIDENT ('Sales', RESEED, 0);
DBCC CHECKIDENT ('Discounts', RESEED, 0);

COMMIT;
