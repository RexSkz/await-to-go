# await-to-go

[![NPM version][npm-image]][npm-url]
[![Downloads][download-badge]][npm-url]

> Async await wrapper for easy error handling like Golang

Special thanks to https://github.com/scopsy/await-to-js for the inspiration, actually I forked this project and make some small changes.

## Pre-requisites
You need to use Node 7.6 (or later) or an ES7 transpiler in order to use async/await functionality.
You can use babel or typescript for that.

## Install

```sh
npm i await-to-go --save
```

## Usage

```js
import go from 'await-to-go';
// If you use CommonJS (i.e NodeJS environment), it should be:
// const go = require('await-to-go').default;

async function asyncTaskWithCb(cb) {
  let err, user, savedTask, notification;

  // data and error are returned
  [user, err] = await go(UserModel.findById(1));
  // handling error here, not data itself
  if (err) return cb('No user found');

  [savedTask, err] = await go(TaskModel({userId: user.id, name: 'Demo Task'}));
  if (err) return cb('Error occurred while saving task');

  if(user.notificationsEnabled) {
    [, err] = await go(NotificationService.sendNotification(user.id, 'Task Created'));
    if (err) return cb('Error while sending notification');
  }

  if(savedTask.assignedUser.id !== user.id) {
    [notification, err] = await go(NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you'));
    if (err) return cb('Error while sending notification');
  }

  cb(null, savedTask);
}

async function asyncFunctionWithThrow() {
  const [user, err] = await go(UserModel.findById(1));
  if (err) throw new Error(err);
}
```

## TypeScript usage
```typescript
interface ServerResponse {
  test: number;
}

const p = Promise.resolve({test: 123});

const [data, err] = await go<ServerResponse>(p);
console.log(data.test);
```

## License

MIT

[npm-url]: https://npmjs.org/package/await-to-go
[npm-image]: https://img.shields.io/npm/v/await-to-go.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/await-to-go.svg?style=flat-square
