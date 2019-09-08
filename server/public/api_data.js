define({ "api": [  {    "type": "post",    "url": "/api/task/add",    "title": "Create new Task",    "version": "1.0.0",    "group": "Task",    "description": "<p>Create new task</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "user_id",            "description": "<p>user's id.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>task's name.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "hours",            "description": "<p>hours of the task.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "minutes",            "description": "<p>minutes of the task</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "seconds",            "description": "<p>second of the task.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "ok",            "description": "<p>status</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "task",            "description": "<p>task</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task._id",            "description": "<p>task's id.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "task.startDate",            "description": "<p>task's start date.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.name",            "description": "<p>task' name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.hours",            "description": "<p>task's hours.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.minutes",            "description": "<p>task's minutes.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.seconds",            "description": "<p>task's seconds.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "task.status",            "description": "<p>task's status.</p>"          },          {            "group": "Success 200",            "type": "Sting",            "optional": false,            "field": "task.status.status",            "description": "<p>status' description.</p>"          },          {            "group": "Success 200",            "type": "Sting",            "optional": false,            "field": "task.status.abr",            "description": "<p>status' abr.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n     \"ok\":true,\n     \"taks\":{\n         \"_id\":\"id\",\n         \"startDate\":\"2019-09-08T04:51:18.766Z\" \n         \"name\":\"task's name\",\n         \"hours\":1,\n         \"minutes\":1,\n         \"seconds\":1,\n         \"status\": {\n             \"status\": \"active\",\n             \"abr\": \"A\"\n         }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4XX": [          {            "group": "Error 4XX",            "optional": false,            "field": "ValidationError",            "description": ""          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "    HTTP/1.1 400 Bad Request\n    {\n         \"ok\":false,\n         \"err\":\"ValidationError\",\n         \"message\":\"Task validation failed: hours: hours is required\"\n}",          "type": "json"        }      ]    },    "filename": "server/routes/tasks.js",    "groupTitle": "Task",    "name": "PostApiTaskAdd"  },  {    "type": "put",    "url": "/api/task/:id",    "title": "Change task's status",    "version": "1.0.0",    "group": "Task",    "description": "<p>Change task's status</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>user's id.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "new_status",            "description": "<p>new status.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "ok",            "description": "<p>status</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "task",            "description": "<p>task</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task._id",            "description": "<p>task's id.</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "task.startDate",            "description": "<p>task's start date.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.name",            "description": "<p>task' name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.hours",            "description": "<p>task's hours.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.minutes",            "description": "<p>task's minutes.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.seconds",            "description": "<p>task's seconds.</p>"          },          {            "group": "Success 200",            "type": "Numeric",            "optional": false,            "field": "task.current_time",            "description": "<p>task's curent time.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "task.status",            "description": "<p>task's status.</p>"          },          {            "group": "Success 200",            "type": "Sting",            "optional": false,            "field": "task.status.status",            "description": "<p>status' description.</p>"          },          {            "group": "Success 200",            "type": "Sting",            "optional": false,            "field": "task.status.abr",            "description": "<p>status' abr.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n     \"ok\":true,\n     \"taks\":{\n         \"_id\":\"id\",\n         \"startDate\":\"2019-09-08T04:51:18.766Z\"\n         \"name\":\"task's name\",\n         \"hours\":1,\n         \"minutes\":1,\n         \"seconds\":1,\n         \"current_time\":0\n         \"status\": {\n             \"status\": \"active\",\n             \"abr\": \"A\"\n         }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4XX": [          {            "group": "Error 4XX",            "optional": false,            "field": "ValidationError",            "description": ""          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "    HTTP/1.1 400 Bad Request\n    {\n         \"ok\":false,\n         \"err\":\"ValidationError\",\n         \"message\":\"Task validation failed: hours: hours is required\"\n}",          "type": "json"        }      ]    },    "filename": "server/routes/tasks.js",    "groupTitle": "Task",    "name": "PutApiTaskId"  },  {    "type": "get",    "url": "/api/users",    "title": "Request a list of users",    "version": "1.0.0",    "group": "User",    "description": "<p>Get a list of users in the application</p>",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "ok",            "description": "<p>status</p>"          },          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "users",            "description": "<p>users in the app</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.username",            "description": "<p>user's username.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.email",            "description": "<p>user's email.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n     \"ok\":true,\n     \"users\":[\n         {\n             \"_id\":\"id\",\n             \"username\":\"username\",\n             \"email\":\"email\"\n         }\n     ]\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 5XX": [          {            "group": "Error 5XX",            "optional": false,            "field": "ConnectionFail",            "description": "<p>The API couldn't connect to DB.</p>"          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 500 Internal Server Error\n{\n     \"ok\": false,\n     \"err\": \"ConnectionFail\",\n     \"message\": \"The API couldn't connect to DB\"\n}",          "type": "json"        }      ]    },    "filename": "server/routes/users.js",    "groupTitle": "User",    "name": "GetApiUsers"  },  {    "type": "get",    "url": "/api/users/tasks/:id",    "title": "Required task's user",    "version": "1.0.0",    "group": "User",    "description": "<p>Required task's user</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>user's id.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "ok",            "description": "<p>status</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "task",            "description": "<p>task</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task._id",            "description": "<p>task's id.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.name",            "description": "<p>task' name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.hours",            "description": "<p>task's hours.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.minutes",            "description": "<p>task's minutes.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "task.seconds",            "description": "<p>task's seconds.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "task.status",            "description": "<p>task's status.</p>"          },          {            "group": "Success 200",            "type": "Sting",            "optional": false,            "field": "task.status.status",            "description": "<p>status' description.</p>"          },          {            "group": "Success 200",            "type": "Sting",            "optional": false,            "field": "task.status.abr",            "description": "<p>status' abr.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n     \"ok\":true,\n     \"tasks\":[\n         {\n             \"startDate\":\"2019-09-08T03:27:02.000Z\",\n             \"_id\":\"id\",\n             \"name\":\"task1\",\n             \"hours\":1,\n             \"minutes\":1,\n             \"seconds\":1,\n             \"status\":{\n                 \"_id\":\"id\",\n                 \"status\":\"active\",\n                 \"abr\":\"A\"\n             },\n             \"user\":\"5d7431312c699b18b4211b68\",\n             \"__v\":0\n         }\n     ]\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4XX": [          {            "group": "Error 4XX",            "optional": false,            "field": "ValidationError",            "description": ""          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 400 Bad Request\n{\n     \"ok\":false,\n     \"err\":\"ValidationError\",\n     \"message\":\"User validation failed: username: username is required, email: email is required\"\n}",          "type": "json"        }      ]    },    "filename": "server/routes/users.js",    "groupTitle": "User",    "name": "GetApiUsersTasksId"  },  {    "type": "post",    "url": "/api/users/add",    "title": "Insert user",    "version": "1.0.0",    "group": "User",    "description": "<p>Create a new user</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>user's username.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>user's email.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Boolean",            "optional": false,            "field": "ok",            "description": "<p>status</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "users",            "description": "<p>users object</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.username",            "description": "<p>username.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "users.email",            "description": "<p>email.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n     \"ok\":true,\n     \"user\":{\n         \"_id\":\"id\",\n         \"username\":\"username\",\n         \"email\":\"email\"\n     }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4XX": [          {            "group": "Error 4XX",            "optional": false,            "field": "ValidationError",            "description": ""          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 400 Bad Request\n{\n     \"ok\":false,\n     \"err\":\"ValidationError\",\n     \"message\":\"User validation failed: username: username is required, email: email is required\"\n}",          "type": "json"        }      ]    },    "filename": "server/routes/users.js",    "groupTitle": "User",    "name": "PostApiUsersAdd"  }] });
