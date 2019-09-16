drop database if exists coffee_menu;
create database if not exists coffee_menu;

use coffee_menu;

drop table if exists category;
create table if not exists category (
    category_id int unsigned not null auto_increment,
    category_name varchar(50) not null unique,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp not null,
    primary key (category_id)
);

drop table if exists product;
create table if not exists product (
	product_id int unsigned not null auto_increment,
    product_name varchar(80) not null unique,
    description varchar(150),
    product_image blob,
    category_id int unsigned,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp not null,
    primary key (product_id),
    constraint FK_CategoryProduct foreign key (category_id) references category(category_id) on delete cascade on update cascade
);

drop table if exists variant;
create table if not exists variant (
    variant_id int unsigned not null auto_increment,
    variant_name varchar(20) not null unique,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp not null,
    primary key (variant_id)
);

drop table if exists variant_values;
create table if not exists variant_values (
    value_id int unsigned not null auto_increment,
    value_name varchar(100) not null,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp not null,
    product_id int unsigned,
    variant_id int unsigned,
    primary key (value_id),
    constraint FK_ProductVariantValues foreign key (product_id) references product(product_id) on delete cascade on update cascade,
    constraint FK_VariantVariantValues foreign key (variant_id) references variant(variant_id) on delete cascade on update cascade
);

drop table if exists sku;
create table if not exists sku (
    sku_id int unsigned not null auto_increment,
    sku varchar(100) not null unique,
    price float not null,
    created_at timestamp default current_timestamp not null,
    updated_at timestamp not null,
    product_id int unsigned,
    primary key (sku_id),
    constraint FK_ProductSku foreign key (product_id) references product(product_id) on delete cascade on update cascade
);

drop table if exists sku_values;
create table if not exists sku_values (
    sku_id int unsigned,
    value_id int unsigned,
    constraint FK_SkuSkuValues foreign key (sku_id) references sku(sku_id) on delete cascade on update cascade,
    constraint FK_VariantValuesSkuValues foreign key (value_id) references variant_values(value_id) on delete cascade on update cascade
);
