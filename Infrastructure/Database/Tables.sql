
CREATE TABLE Customers (
    CustomerId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    Address NVARCHAR(200),
    Phone NVARCHAR(15),
    StartDate DATETIME
);

CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) UNIQUE,
    Manufacturer NVARCHAR(100),
    Style NVARCHAR(50),
    PurchasePrice DECIMAL(18,2),
    SalePrice DECIMAL(18,2),
    QtyOnHand INT,
    CommissionPercentage DECIMAL(5,2)
);


CREATE TABLE Salespersons (
    SalespersonId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    Address NVARCHAR(200),
    Phone NVARCHAR(15),
    StartDate DATETIME,
    TerminationDate DATETIME NULL,
    ManagerId INT NULL,
    FOREIGN KEY (ManagerId) REFERENCES Salespersons(SalespersonId)
);

CREATE TABLE Discounts (
    DiscountId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT,
    BeginDate DATETIME,
    EndDate DATETIME,
    DiscountPercentage DECIMAL(5,2),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

CREATE TABLE Sales (
    SaleId INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT,
    SalespersonId INT,
    CustomerId INT,
    SalesDate DATETIME,
    SalePrice DECIMAL(18,2),
    Commission DECIMAL(18,2),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    FOREIGN KEY (SalespersonId) REFERENCES Salespersons(SalespersonId),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);



