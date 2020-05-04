USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getAllProducts`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllProducts`()
begin

	select product.product_id, sku.sku, product.product_name, product.description, product.product_image
	from product
	inner join sku on product.product_id = sku.product_id
	group by product_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getCategories
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getCategories`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCategories`()
begin

	select category_id, category_name
    from category
    order by category_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getOneCategory
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getOneCategory`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOneCategory`(categoryId int)
begin

	select category_id, category_name
    from category
    where category_id = categoryId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getOneProduct
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getOneProduct`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOneProduct`(productId int)
begin

	select product.product_name, product.description, product.product_image, category.category_name
	from product
	inner join category on product.category_id = category.category_id
    where product.product_id = productId
    group by product.product_id;


end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductByCategory
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductByCategory`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductByCategory`(categoryId int)
begin

	select product.product_name, product.description, product.product_image, category.category_name
	from product
	inner join category on product.category_id = category.category_id
    where product.category_id = categoryId
    group by product.product_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductByName
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductByName`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductByName`(productName varchar(80))
begin

	select product.product_name, product.description, product.product_image, category.category_name
	from product
	inner join category on product.category_id = category.category_id
    where product.product_name = productName
    group by product.product_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductSku
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductSku`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductSku`()
begin

	select product.product_name, product.description, sku.sku, sku.price
	from product
	inner join sku on product.product_id = sku.product_id
	order by product.product_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductSkuByName
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductSkuByName`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductSkuByName`(productName varchar(80))
begin

	select product.product_name, product.description, sku.sku, sku.price
	from product
	inner join sku on product.product_id = sku.product_id
	where product.product_name like concat('%', productName, '%')
	order by product.product_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductVariantValuesBySkuId
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductVariantValuesBySkuId`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductVariantValuesBySkuId`(skuId int)
begin

	declare finished integer default 0;
    declare valueName varchar(50) default '';
    declare valueList varchar(100) default '';

    declare value_cursor cursor for
    select value_name from sku_values
    inner join variant_values on sku_values.value_id = variant_values.value_id
	where sku_values.sku_id = skuId;

    declare continue handler for not found set finished = 1;

    open value_cursor;

    get_value: loop

    fetch value_cursor into valueName;

    if finished = 1 then
    leave get_value;
    end if;

    set valueList = concat(valueName, ', ', valueList);

    end loop;

    close value_cursor;

	select product.product_name, product.description, sku.sku, sku.price, valueList as 'variantes'
	from sku_values
	inner join sku on sku_values.sku_id = sku.sku_id
	inner join variant_values on sku_values.value_id = variant_values.value_id
	inner join product on variant_values.product_id = product.product_id
    where sku_values.sku_id = skuId
    group by sku_values.sku_id;






end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductVariants
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductVariants`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductVariants`()
begin

	select product.product_id, vv.value_name, sku.price
	from variant_values vv
	inner join product on vv.product_id = product.product_id
	inner join sku on product.product_id = sku.product_id
	inner join variant_values on sku.product_id = variant_values.product_id
	group by vv.value_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getProductsCount
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getProductsCount`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getProductsCount`()
BEGIN

	select count(product.product_name) as products_total
	from product;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getUserProducts
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getUserProducts`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserProducts`()
BEGIN

	select product.product_name, product.description
	from product
	order by product_id;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getVariant
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getVariant`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVariant`(variantId int)
begin

	select variant_id, variant_name
    from variant
    where variant_id = variantId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getVariantValues
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getVariantValues`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVariantValues`()
BEGIN

	select value_id, value_name, product_id, variant_id
    from variant_values;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getVariantValuesByName
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getVariantValuesByName`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVariantValuesByName`(productId int, valueName varchar(100))
begin

	select value_id
    from variant_values
    where variant_values.product_id = productId and value_name = valueName;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getVariantValuesByProduct
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getVariantValuesByProduct`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVariantValuesByProduct`(productId int)
begin

	select value_id, value_name, product_id, variant_id
    from variant_values
    where product_id = productId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getVariants
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getVariants`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVariants`()
begin

	select variant_id, variant_name
    from variant
    order by variant_id;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure getVariantsCountByProduct
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`getVariantsCountByProduct`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getVariantsCountByProduct`(productId int)
begin

	select count(sku.product_id) 'Number of variants'
	from sku
	inner join product on sku.product_id = product.product_id
	where product.product_id = productId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure newCategory
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`newCategory`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `newCategory`(categoryName varchar(50))
begin

	insert into category(category_name)
    values(categoryName);

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure newProduct
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`newProduct`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `newProduct`(productName varchar(80), description varchar(150), productImage blob, categoryId int)
begin

	insert into product(product_name, description, product_image, category_id)
	values(productName, description, productImage, categoryId);

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure newSku
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`newSku`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `newSku`(sku varchar(100), price float, productId int, out insertId int)
begin

	#declare productSku char(100);
	#declare lastValueId int;

    #select last_insert_id() into lastValueId;

	#select setProductSku(productId, lastValueId) into productSku;

	insert into sku(sku, price, product_id)
    values (sku, price, productId);

	select last_insert_id() into insertId;
end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure newVariant
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`newVariant`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `newVariant`(variantName varchar(100))
begin

    insert into variant(variant_name)
    values (variantName);

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure newVariantValues
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`newVariantValues`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `newVariantValues`(valueName varchar(100), productId int, variantId int)
begin

    insert into variant_values(value_name, product_id, variant_id)
    values (valueName, productId, variantId);

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure removeAllProducts
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`removeAllProducts`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeAllProducts`()
begin

	set foreign_key_checks = 0;

	truncate table product;
    truncate table variant_values;
    truncate table sku;
    truncate table sku_values;

    set foreign_key_checks = 1;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure removeCategories
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`removeCategories`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeCategories`()
begin

	set foreign_key_checks = 0;

    truncate table category;

    set foreign_key_checks = 1;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure removeCategory
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`removeCategory`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeCategory`(categoryId int)
begin

	delete from category
    where category_id = categoryId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure removeProduct
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`removeProduct`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeProduct`(productId int)
begin

	delete from product
    where product_id = productId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure removeVariant
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`removeVariant`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeVariant`(variantId int)
begin

	delete from variant
    where variant_id = variantId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure removeVariantValues
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`removeVariantValues`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `removeVariantValues`(valueId int)
begin

	delete variant_values, sku, sku_values
	from variant_values
	inner join sku_values on variant_values.value_id = sku_values.value_id
	inner join sku on sku_values.sku_id = sku.sku_id
	where variant_values.value_id = valueId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- function setProductSku
-- -----------------------------------------------------

USE `coffee_menu`;
DROP function IF EXISTS `coffee_menu`.`setProductSku`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `setProductSku`(productId int, lastValueId int) RETURNS char(100) DETERMINISTIC
begin

	return concat('C', cast(productId as char(100)), cast(lastValueId as char(100)));

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateCategory
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateCategory`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCategory`(categoryId int, categoryName varchar(50))
begin

	update category
    set category_name = categoryName, updated_at = now()
    where category_id = categoryId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateCoffeeBean
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateCoffeeBean`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateCoffeeBean`(coffeeBeanId int, coffeeName varchar(50), coffeeOrigin varchar(100), description varchar(150))
BEGIN

	update coffee_bean
    set coffee_name = coffeeName, coffee_origin = coffeeOrigin, description = description, updated_at = now()
    where coffee_name = coffeeName;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateProduct
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateProduct`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateProduct`(productId int, productName varchar(80), description varchar(150), productImage blob, categoryId int)
begin

	update product
    set product_name = productName, description = description, product_image = productImage, category_id = categoryId, updated_at = now()
    where product_id = productId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateSku
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateSku`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateSku`(skuId int, sku varchar(100), price float, productId int)
begin

	update sku
    set sku = sku, price = price, product_id = productId, updated_at = now()
    where sku_id = skuId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateSkuValues
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateSkuValues`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateSkuValues`(skuId int, valueId int)
begin

	update sku_values
    set value_id = valueId
    where sku_id = skuId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateVariant
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateVariant`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateVariant`(variantId int, variantName varchar(100))
begin

	update variant
    set variant_name = variantName, updated_at = now()
    where variant_id = variantId;

end$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure updateVariantValues
-- -----------------------------------------------------

USE `coffee_menu`;
DROP procedure IF EXISTS `coffee_menu`.`updateVariantValues`;

DELIMITER $$
USE `coffee_menu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateVariantValues`(valueId int, valueName varchar(100), variantId int)
begin

	update variant_values
    set value_name = valueName, variant_id = variantId, updated_at = now()
    where value_id = valueId;

end$$

DELIMITER ;
