const Path = require("path");
const { readFileContent, writeToFile } = require("../utils/fsHandlers");
const FILE_NAME = "datastore.json";


const storeServices = {
  async fetchEventList() {
    const filePath = Path.resolve(process.cwd(), FILE_NAME);
    const fileContent = await readFileContent(filePath);
    let events = [];
    try {
      events = JSON.parse(fileContent);
    } catch (error) {
      events = [];
    }

    return events;
  },
  async fetchEvent(id) {
    const events = await storeServices.fetchEventList();

    for (let event of events) {
      if (event.id === id) {
        return event;
      }
    }

    return null;
  },
  async addEvent(event) {
    // fetch the content of file
    const events = await storeServices.fetchEventList();
    // push the new object to file
    events.unshift(event);
    // update datastore
    const filePath = Path.resolve(process.cwd(), FILE_NAME);
    await writeToFile(filePath, JSON.stringify(events));

    return event;
  },
};

module.exports = storeServices;
