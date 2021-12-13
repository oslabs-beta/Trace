"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = void 0;
const alignTableData_1 = require("./alignTableData");
const calculateCellWidths_1 = require("./calculateCellWidths");
const calculateRowHeights_1 = require("./calculateRowHeights");
const drawTable_1 = require("./drawTable");
const makeTableConfig_1 = require("./makeTableConfig");
const mapDataUsingRowHeights_1 = require("./mapDataUsingRowHeights");
const padTableData_1 = require("./padTableData");
const stringifyTableData_1 = require("./stringifyTableData");
const truncateTableData_1 = require("./truncateTableData");
const validateTableData_1 = require("./validateTableData");
const table = (data, userConfig = {}) => {
    (0, validateTableData_1.validateTableData)(data);
    let rows = (0, stringifyTableData_1.stringifyTableData)(data);
    const config = (0, makeTableConfig_1.makeTableConfig)(rows, userConfig);
    rows = (0, truncateTableData_1.truncateTableData)(rows, config);
    const rowHeights = (0, calculateRowHeights_1.calculateRowHeights)(rows, config);
    rows = (0, mapDataUsingRowHeights_1.mapDataUsingRowHeights)(rows, rowHeights, config);
    rows = (0, alignTableData_1.alignTableData)(rows, config);
    rows = (0, padTableData_1.padTableData)(rows, config);
    const cellWidths = (0, calculateCellWidths_1.calculateCellWidths)(rows[0]);
    return (0, drawTable_1.drawTable)(rows, cellWidths, rowHeights, config);
};
exports.table = table;
//# sourceMappingURL=table.js.map