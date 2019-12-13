-- SELECT * FROM product_info
-- INTO OUTFILE '/home/arik/VendingMachine/dump/product_info.csv' 
-- FIELDS ENCLOSED BY '"' 
-- TERMINATED BY ';' 
-- ESCAPED BY '"' 
-- LINES TERMINATED BY '\r\n';

-- SELECT * FROM sales
-- INTO OUTFILE '/home/arik/VendingMachine/dump/sales.csv' 
-- FIELDS ENCLOSED BY '"' 
-- TERMINATED BY ';' 
-- ESCAPED BY '"' 
-- LINES TERMINATED BY '\r\n';


(SELECT 'product_id', 'product_name', 'price', 'remaining')
UNION
(SELECT product_id, product_name, price, remaining FROM product_info
INTO OUTFILE '/tmp/product_info.csv' 
FIELDS ENCLOSED BY '"' 
TERMINATED BY ';' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n');

(SELECT 'sale_id', 'timestamp', 'item_sold')
UNION
(SELECT sale_id, timestamp, item_sold FROM sales
INTO OUTFILE '/tmp/sales.csv' 
FIELDS ENCLOSED BY '"' 
TERMINATED BY ';' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n');
