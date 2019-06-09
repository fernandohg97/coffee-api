insert into category ('category_name')
values ('Espresso'),
('Filter');

insert into product (product_name, description, product_image, category_id)
values ('Espresso', 'Small bitter beverage that  spreads all flavor notes', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 1),
('Cortado', 'Espresso shot with a small amount of milk', 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 1),
('Americano', 'Espresso shot with pure water', 'https://images.unsplash.com/photo-1556845925-1ff299fcd5b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 1),
('Flat white', 'Espresso shot with less amout of milk than cappuccino', 'https://images.unsplash.com/photo-1558210834-473f430c09ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 1),
('Cappuccino', 'Espresso shot with some amount of milk', 'https://images.unsplash.com/photo-1551539441-309773d8580b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80', 1),
('Latte', 'Espresso shot with many amount of milk', 'https://images.unsplash.com/photo-1555778586-061e5dee1102?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1316&q=80', 1),
('Mocha', 'Espresso shot, many amount of milk and cacao chocolate', 'https://images.unsplash.com/photo-1521813475821-5e3f5bc3c7a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80', 1),
('V60', 'Filtered coffee with water spreading all flavor notes', 'https://images.unsplash.com/photo-1541498355002-4ee81a1872ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80', 2),
('Chemex', 'Filtered coffee with water spreading all flavor notes', 'https://images.unsplash.com/photo-1520722217742-5887a8cb5778?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 2),
('Aeropress', 'Filtered pressure coffee', 'https://images.unsplash.com/photo-1496198183329-402041b2487b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1032&q=80', 2),
('Syphon', 'It produces a delicate, tea-like cup of coffee', 'https://images.unsplash.com/photo-1550048192-f5416a1f132a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 2);

insert into variant (variant_name)
values ('size'),
('flavor');

insert into variant_values (value_name, product_id, variant_id)
values ('2oz', 1, 1),
('4oz', 2, 1),
('10oz', 3, 1),
('12oz', 3, 1),
('8oz', 4, 1),
('10oz', 5, 1),
('12oz', 6, 1),
('normal', 6, 2),
('vainilla', 6, 2),
('12oz', 7, 1),
('8oz', 8, 1),
('12oz', 8, 1),
('8oz', 9, 1),
('12oz', 9, 1),
('10oz', 10, 1),
('12oz', 11, 1),
('10oz', 11, 1);

insert into sku (sku, price, product_id)
values ('Espresso-2oz', 35, 1),
('Cortado-4oz',40, 2),
('Americano-10oz', 41, 3),
('Americano-12oz', 43, 3),
('Flatwhite-8oz', 40, 4),
('Cappucciono-10oz', 45, 5),
('Latte-12oz-normal', 50, 6),
('Latte-12oz-vainilla', 55, 6),
('Mocha-12oz', 55, 7),
('V60-8oz', 42, 8),
('V60-12oz', 45, 8),
('Chemex-8oz', 42, 9),
('Cheme-12oz', 45, 9),
('Aeropress-10oz', 45, 10),
('Syphon-10oz', 56, 11),
('Syphon-12oz', 60, 11);
