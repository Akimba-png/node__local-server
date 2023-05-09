const { readFile, writeFile } = require('node:fs/promises');

class DbService {
  async find(filePath, element) {
    const dbData = await this.#readFile(filePath);
    const filteredData = JSON.parse(dbData).filter((e) => {
      return Object.values(e).includes(element);
    });
    return filteredData;
  }

  async findOne(filePath, element) {
    const dbData = await this.#readFile(filePath);
    const filteredData = JSON.parse(dbData).find((e) => {
      return Object.values(e).includes(element);
    });
    return filteredData;
  }

  async updateOne(filePath, element) {
    const dbData = await this.#readFile(filePath);
    const parsedData = JSON.parse(dbData);
    const updatedData = parsedData.map((e) => {
      if (e.userId === element.userId) {
        return element;
      }
      return e;
    });
    await this.#writeFile(filePath, JSON.stringify(updatedData));
  }

  async create(filePath, element) {
    element.id = Date.now().toString();
    const dbData = await this.#readFile(filePath);
    const parsedData = JSON.parse(dbData);
    parsedData.push(element);
    await this.#writeFile(filePath, JSON.stringify(parsedData));
  }

  async #readFile(path) {
    try {
      return await readFile(path, {encoding: 'utf-8'});
    } catch (error) {
      throw new Error('Something wrong happend while reading db');
    }
  }

  async #writeFile(path, data) {
    try {
      await writeFile(path, data);
    } catch (error) {
      throw new Error('Something wrong happened while writing db');
    }
  }
}

module.exports = new DbService();
