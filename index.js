var assert = require("assert");
var fs = require("fs");
var mkdirp = require('mkdirp');

module.exports = function(folder, file) {
    assert.ok(!(typeof folder != 'string' ? true : false), "Mem directory not defined");
    assert.ok(!(folder.length === 0 ? true : false), "Mem directory not defined");

    assert.ok(!(typeof file != 'string' ? true : false), "Mem file not defined");
    assert.ok(!(file.length === 0 ? true : false), "Mem file not defined");

    this.$mem_folder = '/dev/shm/' + folder + '/';
    this.$mem_file = file;
    this.$mem = load(this.$mem_folder, this.$mem_file);

    this.get = function(id, key){

        //return entire cache
        if(typeof id == 'undefined' && typeof key == 'undefined')return this.$mem;

        //return all keys for `id`
        assert.ok(!(typeof id == 'undefined' ? true : false), "`id` Not Defined");//`id` must be specified
        if(typeof key == 'undefined')
        {
            if (!array_key_exists(id, this.$mem)) return null;
            return this.$mem[id];
        }

        //return all `key` for `id`
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


    this.del = function(id, key) {
        assert.ok(!(typeof id == 'undefined' ? true : false), "`id` Not Defined");//`id` must be specified

        if (!array_key_exists(id, this.$mem)) return null;//check if id exists

        if(typeof key == 'undefined')delete(this.$mem[id]);//delete all keys and id
        else 
        {
            if (!array_key_exists(key, this.$mem[id])) return null;
            delete(this.$mem[id][key]);
        }

        this.$mem = save(this.$mem_folder, this.$mem_file, this.$mem);
    };

    this.clear = function() {
        this.$mem = save(this.$mem_folder, this.$mem_file, {});
    };

    this.count = function(id, key){

        //return entire cache
        if(typeof id == 'undefined' && typeof key == 'undefined')return Object.keys(this.$mem).length;

        //return all keys for `id`
        assert.ok(!(typeof id == 'undefined' ? true : false), "`id` Not Defined");//`id` must be specified
        if(typeof key == 'undefined')
        {
            if (!array_key_exists(id, this.$mem)) return 0;

            if(typeof this.$mem[id] == 'object')return Object.keys(this.$mem[id]).length;
            
            return this.$mem[id].length;
        }

        //return all `key` for `id`
        assert.ok(!(typeof key == 'undefined' ? true : false), "`key` Not Defined");
        if (!array_key_exists(id, this.$mem)) return 0;
        if (!array_key_exists(key, this.$mem[id])) return 0;
        
        if(typeof this.$mem[id][key] == 'array')return this.$mem[id][key].length;
        else if(typeof this.$mem[id][key] == 'object')return Object.keys(this.$mem[id][key]).length;
        
        return 0;
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
