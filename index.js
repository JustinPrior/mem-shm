var assert = require("assert");
var fs = require("fs");
var mkdirp = require('mkdirp');

module.exports = function(folder, file) {
    assert.ok(!(typeof folder != 'string' ? true : false), "Mem directory not defined");
    assert.ok(!(folder.length === 0 ? true : false), "Mem directory not defined");

    assert.ok(!(typeof file != 'string' ? true : false), "Mem directory not defined");
    assert.ok(!(file.length === 0 ? true : false), "Mem directory not defined");

    this.$mem_folder = '/dev/shm/' + folder + '/';
    this.$mem_file = file;
    this.$mem = load(this.$mem_folder, this.$mem_file);

    this.get = function(id, key){
        if(typeof id == 'undefined' && typeof key == 'undefined')return this.$mem;//return all Keys
        
        assert.ok(!(typeof id == 'undefined' ? true : false), "`id` Not Defined");
        assert.ok(!(typeof key == 'undefined' ? true : false), "`key` Not Defined");

        if (!array_key_exists(id, this.$mem)) return null;
        if (!array_key_exists(key, this.$mem[id])) return null;
        return this.$mem[id][key];
    };

    this.set = function(id, key, data) {
        assert.ok(!(typeof id == 'undefined' ? true : false), "`id` Not Defined");
        assert.ok(!(typeof key == 'undefined' ? true : false), "`key` Not Defined");
        data = (typeof data === 'undefined' ? null : data);

        if (!array_key_exists(id, this.$mem)) this.$mem[id] = {};
        this.$mem[id][key] = data;

        this.$mem = save(this.$mem_folder, this.$mem_file, this.$mem);
    };

};

function array_key_exists(key, array) {
    if (!array || (array.constructor !== Array && array.constructor !== Object)) return false;
    return key in array;
}

function load(folder, file) {
    try {
        var contents = fs.readFileSync(folder + file);
        return JSON.parse(contents);
    } catch (e) {}
    return {};
}

function save(folder, file, object) {
    try {
        mkdirp.sync(folder);
        fs.writeFileSync(folder + file, JSON.stringify(object) + "\n");
        return load(folder, file);
    } catch (e) {}
    return {};
}
