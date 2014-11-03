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
 
####Specific Key for `memoryId`

    var tmp = mem.get(memoryId,key);
    console.log(tmp);

#####Note: returned `tmp` can be an Object, JSON.parse will be applied

## Set

    var memoryId = "test";
    var key = "test";
    var val = 1;
    
    mem.set(memoryId,key,val);

#####Note: `val` can be an Object, JSON.stringify will be applied

## Delete

####`memoryId` and All Keys for `memoryId`

    mem.del(memoryId);
 
####Specific Key  for `memoryId`

   mem.del(memoryId,key);


## Clear

####Empties entire mem cache

    mem.clear();

## Count

####Entire Cache Length

    var leng = mem.count();
    console.log(leng);

####Length of `memoryId`

    var leng = mem.count(memoryId);
    console.log(leng);
 
####Length of Specific Key for `memoryId`

    var leng = mem.count(memoryId,key);
    console.log(leng);


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

## mem.del(memoryId)

    Deletes the [`memoryId`] from /dev/shm/`directory`/`file` if it exists

## mem.del(memoryId,key)

    Deletes the [`memoryId`][`key`] from /dev/shm/`directory`/`file` if it exists

## mem.clear()

    Empties entire mem cache in /dev/shm/`directory`/`file`

## mem.count()

    Returns length of entire mem cache in /dev/shm/`directory`/`file`

## mem.count(memoryId)

    Returns length of [`memoryId`] from /dev/shm/`directory`/`file` or 0 if it does not exist

## mem.count(memoryId,key)

    Returns length of [`memoryId`][`key`] from /dev/shm/`directory`/`file` or 0 if it does not exist
