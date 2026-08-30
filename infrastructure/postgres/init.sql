-- ZUSTAG Transactional Database Schema (PostgreSQL)
-- Kangqore Group - Hyperlocal Fashion Commerce Network

CREATE TABLE IF NOT EXISTS merchants (
    id VARCHAR(64) PRIMARY KEY,
    legal_business_name VARCHAR(255) NOT NULL,
    brand_trade_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(32) NOT NULL,
    gstin VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stores (
    id VARCHAR(64) PRIMARY KEY,
    merchant_id VARCHAR(64) REFERENCES merchants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address_line TEXT NOT NULL,
    locality VARCHAR(128) NOT NULL,
    city VARCHAR(64) NOT NULL DEFAULT 'Jamshedpur',
    postal_code VARCHAR(16) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    avg_prep_time_minutes INT DEFAULT 6,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    brand VARCHAR(128) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(64) NOT NULL,
    gender VARCHAR(32) NOT NULL,
    mrp NUMERIC(10, 2) NOT NULL,
    base_price NUMERIC(10, 2) NOT NULL,
    images JSONB DEFAULT '[]',
    fabric VARCHAR(128),
    pattern VARCHAR(128),
    occasion VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_variants (
    id VARCHAR(64) PRIMARY KEY,
    product_id VARCHAR(64) REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(128) UNIQUE NOT NULL,
    size VARCHAR(32) NOT NULL,
    color VARCHAR(64) NOT NULL,
    color_hex VARCHAR(16) NOT NULL,
    mrp NUMERIC(10, 2) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    barcode VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Variant-First Store Inventory (Source of Truth)
CREATE TABLE IF NOT EXISTS store_inventory (
    id VARCHAR(128) PRIMARY KEY,
    store_id VARCHAR(64) REFERENCES stores(id) ON DELETE CASCADE,
    variant_id VARCHAR(64) REFERENCES product_variants(id) ON DELETE CASCADE,
    total_quantity INT NOT NULL DEFAULT 0,
    reserved_quantity INT NOT NULL DEFAULT 0,
    price NUMERIC(10, 2) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_positive_qty CHECK (total_quantity >= 0 AND reserved_quantity >= 0),
    CONSTRAINT check_reserved_not_exceed CHECK (reserved_quantity <= total_quantity)
);

CREATE INDEX IF NOT EXISTS idx_store_inventory_lookup ON store_inventory(store_id, variant_id);
CREATE INDEX IF NOT EXISTS idx_stores_geo ON stores(latitude, longitude);

-- Order Transactions
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    order_number VARCHAR(64) UNIQUE NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    store_id VARCHAR(64) REFERENCES stores(id),
    status VARCHAR(32) NOT NULL DEFAULT 'CREATED',
    subtotal NUMERIC(10, 2) NOT NULL,
    delivery_fee NUMERIC(10, 2) NOT NULL,
    platform_fee NUMERIC(10, 2) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    delivery_address JSONB NOT NULL,
    eta_minutes INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64) REFERENCES orders(id) ON DELETE CASCADE,
    variant_id VARCHAR(64) REFERENCES product_variants(id),
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) NOT NULL
);
