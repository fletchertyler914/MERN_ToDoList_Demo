var rp = require('request-promise');
export class ApiWrapper {
    
    fetchToDoList = () => {
        var options = {
            uri: 'http://localhost:3002/tasks',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp(options);
    }

    createToDoListItem = (item) => {
        var options = {
            uri: 'http://localhost:3002/tasks',
            headers: {
                'User-Agent': 'Request-Promise'
            },
            form: {
                name: item
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp.post(options);
    }

    toggleToDoListItem = (item, status) => {
        console.log(item, status);
        var options = {
            uri: 'http://localhost:3002/tasks/' + item,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            form: {
                status: [status]
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp.put(options);
    }

    deleteToDoListItem = (id) => {
        var options = {
            uri: 'http://localhost:3002/tasks/' + id,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };
        return rp.delete(options);
    }
}

export default ApiWrapper;