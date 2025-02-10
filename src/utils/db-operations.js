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
export const getFromTable = async (tableName, conditions = {}) => {
  const whereClause = Object.keys(conditions).length
    ? 'WHERE ' + Object.keys(conditions).map((key, index) => `${key} = $${index + 1}`).join(' AND ')
    : '';
  const values = Object.values(conditions);

  const query = `
    SELECT * FROM ${tableName}
    ${whereClause}
  `;

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error fetching from database:', error);
    throw error;
  }
};
