mem-shm
==========
Node.JS module which allows you to store, key => value to /dev/shm/


# Usage 

    var memShm = require('mem-shm');
    
    var mem = new memShm("myDirectory","myFile");

## Set

    var memoryId = "test";
    var key = "test";
    var val = 1;
    
    mem.set(memoryId,key,val);

## Get

    var tmp = mem.get(memoryId,key);
    console.log(tmp);
  

# Methods 


    var memShm = require('mem-shm');
    var mem = new memShm(`directory`,`file`);

## mem.get(memoryId,key)

    Returns the [`memoryId`][`key`] from /dev/shm/`directory`/`file` or null if it does not exist

## mem.set(memoryId,key,val)

    Saves `val` to [`memoryId`][`key`] in /dev/shm/`directory`/`file`
