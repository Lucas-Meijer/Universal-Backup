'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alts = void 0;

const ALTS_FILE = 'config/alts.json';

const fs = require('fs');

class Alts {
    /**
     * @param {string} file
     */
    constructor(file) {
        this.filename = file;
        /** @type {{[k: string]: string[]}} */
        this.data = {};
        try {
            this.data = JSON.parse(fs.readFileSync(file).toString());
        } catch (e) {}
    }
    writeData() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data));
    }

    /**
     * @param {string} oldName
     * @param {string} newName
     */
    addAlt(oldName, newName) {
        const oldId = toId(oldName);
        const newId = toId(newName);

        if (!(oldId in this.data)) this.data[oldId] = [newId];
        else this.data[oldId] = this.data[oldId].push(newId);
        if (!(newId in this.data)) this.data[newId] = [oldId];
        else this.data[newId] = this.data[newId].push(oldId);
        
        this.writeData();
    }
    reset() {
        this.data = {};
        this.writeData();
    }
}
const alts = new Alts(ALTS_FILE);

exports.Alts = Alts;

/** @type {ChatCommands} */
const commands = {
    alts: function (target, room) {
        let id = toId(target);
        if (this.can('auth')) {
            
        }
    },
};

exports.commands = commands;
