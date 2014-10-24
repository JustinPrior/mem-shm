mem-shm
==========
Node.JS module which allows you to store, key => value to /dev/shm/


# Usage 

    var memShm = require('mem-shm');
    
    var mem = new memShm("myDirectory","myFile");

## Get

####Entire Cache

    var tmp = mem.get();
    console.log(tmp);

####All Keys for `memoryId`

    var tmp = mem.get(memoryId);
    console.log(tmp);
 
####Specific Key 

    var tmp = mem.get(memoryId,key);
    console.log(tmp);

## Set

    var memoryId = "test";
    var key = "test";
    var val = 1;
    
    mem.set(memoryId,key,val);


# Methods 


    var memShm = require('mem-shm');
    var mem = new memShm(`directory`,`file`);

## mem.get()

    Returns  /dev/shm/`directory`/`file` or null if it does not exist

## mem.get(memoryId)

    Returns the [`memoryId`] from /dev/shm/`directory`/`file` or null if it does not exist

## mem.get(memoryId,key)

    Returns the [`memoryId`][`key`] from /dev/shm/`directory`/`file` or null if it does not exist

## mem.set(memoryId,key,val)

    Saves `val` to [`memoryId`][`key`] in /dev/shm/`directory`/`file`

