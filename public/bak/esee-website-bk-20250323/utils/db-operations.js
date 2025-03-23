import pool from '../config/db.js';

/**
 * Generic function to save data to any table
 * @param {string} tableName - Name of the table
 * @param {Object} data - Object containing column-value pairs to insert
 * @returns {Promise} - Resolves with the inserted row
 */
export const saveToTable = async (tableName, data) => {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);

  const query = `
    INSERT INTO ${tableName} (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *
  `;

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving to database:', error);
    throw error;
  }
};

/**
 * Generic function to update data in any table
 * @param {string} tableName - Name of the table
 * @param {number} id - ID of the record to update
 * @param {Object} data - Object containing column-value pairs to update
 * @returns {Promise} - Resolves with the updated row
 */
export const updateInTable = async (tableName, id, data) => {
  const setClause = Object.keys(data)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');
  const values = [...Object.values(data), id];

  const query = `
    UPDATE ${tableName}
    SET ${setClause}
    WHERE id = $${values.length}
    RETURNING *
  `;

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating in database:', error);
    throw error;
  }
};

/**
 * Generic function to delete data from any table
 * @param {string} tableName - Name of the table
 * @param {number} id - ID of the record to delete
 * @returns {Promise} - Resolves with the deleted row
 */
export const deleteFromTable = async (tableName, id) => {
  const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting from database:', error);
    throw error;
  }
};

/**
 * Generic function to fetch data from any table
 * @param {string} tableName - Name of the table
 * @param {Object} conditions - Optional WHERE conditions
 * @returns {Promise} - Resolves with the matching rows
 */
export const getFromTable = async (tableName, id = null, options = {}) => {
  try {
    let query = `SELECT * FROM ${tableName}`;
    const values = [];
    let paramCount = 1;

    // Handle specific ID
    if (id !== null) {
      query += ` WHERE id = $${paramCount}`;
      values.push(id);
      paramCount++;
    }
    // Handle custom conditions
    else if (options.condition) {
      query += ` WHERE ${options.condition}`;
      if (options.values) {
        values.push(...options.values);
      }
    }

    // Add ORDER BY if specified
    if (options.orderBy) {
      query += ` ORDER BY ${options.orderBy}`;
    }

    // Add LIMIT if specified
    if (options.limit) {
      query += ` LIMIT $${paramCount}`;
      values.push(options.limit);
    }

    console.log('Executing query:', query, 'with values:', values);
    const result = await pool.query(query, values);
    return id === null ? result.rows : result.rows[0];
  } catch (error) {
    console.error('Error fetching from database:', error);
    throw new Error(`Database error: ${error.message}`);
  }
};
