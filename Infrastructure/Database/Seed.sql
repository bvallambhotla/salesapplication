
INSERT INTO Products (Name, Manufacturer, Style, PurchasePrice, SalePrice, QtyOnHand, CommissionPercentage)
VALUES 
('Elevation Max', 'Schwin', 'Mountain', 500.00, 750.00, 20, 10.00),
('Zipper', 'Schwin', 'Road', 600.00, 900.00, 15, 12.00),
('S 1000', 'Guardian', 'Hybrid', 400.00, 600.00, 30, 8.00),
('EZoom 2025', 'Guardian', 'Electric', 1000.00, 1500.00, 10, 15.00),
('Max Tour', 'SLR', 'Touring', 700.00, 1050.00, 12, 10.00),
('Dirt Zoom', 'Specialized', 'Gravel', 550.00, 825.00, 18, 9.00),
('Smart Fold', 'Brompton', 'Folding', 800.00, 1200.00, 10, 11.00),
('Bobber V3', 'Surly', 'Fat', 600.00, 900.00, 8, 10.00),
('Kids Bike', 'Guardian', 'Kids', 300.00, 450.00, 25, 8.00),
('EZip 2000', 'Schwin', 'Electric', 450.00, 675.00, 20, 7.00);


INSERT INTO Salespersons (FirstName, LastName, Address, Phone, StartDate, TerminationDate, ManagerId)
VALUES 
('John', 'Doe', '123 Elm St, Springfield, IL', '555-1234', '2024-01-01', NULL, NULL),
('Jane', 'Smith', '456 Oak St, Springfield, IL', '555-5678', '2024-03-01', NULL, 1),
('Alice', 'Johnson', '789 Pine St, Springfield, IL', '555-8765', '2024-04-15', NULL, 1),
('Bob', 'Brown', '101 Maple St, Springfield, IL', '555-1122', '2024-06-10', NULL, 2),
('Charlie', 'Adams', '202 Cherry St, Springfield, IL', '555-6543', '2024-02-01', NULL, 1),
('David', 'Clark', '303 Walnut St, Springfield, IL', '555-7890', '2024-05-01', NULL, 2),
('Eva', 'Lee', '404 Ash St, Springfield, IL', '555-1239', '2024-07-01', NULL, 3),
('Frank', 'Harris', '505 Fir St, Springfield, IL', '555-9876', '2024-09-01', NULL, 3),
('Grace', 'Anderson', '606 Alder St, Springfield, IL', '555-4321', '2024-11-01', NULL, 4);


INSERT INTO Customers (FirstName, LastName, Address, Phone, StartDate)
VALUES 
('Mike', 'Davis', '123 Birch St, Springfield, IL', '555-9988', '2024-05-01'),
('Sara', 'Miller', '456 Willow St, Springfield, IL', '555-3344', '2024-07-21'),
('Tom', 'Taylor', '789 Cedar St, Springfield, IL', '555-2233', '2024-08-01'),
('Emily', 'Wilson', '101 Redwood St, Springfield, IL', '555-5566', '2024-09-15'),
('Jake', 'Robinson', '202 Poplar St, Springfield, IL', '555-4455', '2024-01-20'),
('Laura', 'Evans', '303 Spruce St, Springfield, IL', '555-9987', '2024-03-15'),
('Chris', 'Baker', '404 Palm St, Springfield, IL', '555-7766', '2024-06-25'),
('Nina', 'Turner', '505 Bamboo St, Springfield, IL', '555-8889', '2024-10-12'),
('Oliver', 'Walker', '606 Sycamore St, Springfield, IL', '555-9090', '2024-11-28');


INSERT INTO Sales (ProductId, SalespersonId, CustomerId, SalesDate, SalePrice, Commission)
VALUES
(1, 1, 1, '2024-07-01', 152.00, 8.00),
(2, 2, 2, '2024-08-15', 110.00, 7.00),
(3, 3, 3, '2024-09-10', 98.00, 5.00),
(4, 4, 4, '2024-10-01', 200.00, 12.00),
(5, 1, 2, '2024-12-05', 499.00, 45.00),
(6, 2, 5, '2024-02-15', 825.00, 74.25),
(7, 3, 6, '2024-03-10', 900.00, 90.00),
(8, 4, 7, '2024-06-05', 450.00, 36.00),
(9, 5, 8, '2024-07-20', 675.00, 47.25),
(10, 1, 9, '2024-09-25', 600.00, 60.00);


INSERT INTO Discounts (ProductId, BeginDate, EndDate, DiscountPercentage)
VALUES
(1, '2024-06-01', '2024-06-30', 10.00),
(2, '2024-07-01', '2024-07-31', 15.00),
(3, '2024-08-01', '2024-08-31', 5.00),
(4, '2024-09-01', '2024-09-30', 20.00),
(5, '2024-10-01', '2024-10-31', 12.00),
(6, '2024-01-01', '2024-01-31', 8.00),
(7, '2024-02-01', '2024-02-28', 10.00),
(8, '2024-03-01', '2024-03-31', 7.00),
(9, '2024-04-01', '2024-04-30', 12.00),
(10, '2024-05-01', '2024-05-31', 15.00);

