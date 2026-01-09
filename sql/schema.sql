CREATE TABLE sales_executives ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL, 
    max_leads INT NOT NULL, 
    current_leads INT DEFAULT 0, 
    priority_order INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_name VARCHAR(100),
    status ENUM('UNASSIGNED', 'ASSIGNED', 'COMPLETED') DEFAULT 'UNASSIGNED',
    assigned_to INT NULL,
    handling_duration INT DEFAULT 30,
    assigned_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES sales_executives (id)
);