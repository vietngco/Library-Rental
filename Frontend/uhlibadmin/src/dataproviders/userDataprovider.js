import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { responsiveFontSizes } from '@material-ui/core';

<<<<<<< HEAD
// const apiUrl = 'http://localhost:5000/api';
const apiUrl = 'https://uhlib.cc/api'
const httpClient = fetchUtils.fetchJson;

export default {
    getList:  async (resource, params) => {
=======
const apiUrl = 'http://localhost:5000/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList:  (resource, params) => {
>>>>>>> upstream/main
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
<<<<<<< HEAD
        // We cna change the sort here 
        // console.log(query)
        // params["sort"]["field"] ="first_name"
        // console.log(params)
        const url = `${apiUrl}/${resource}/allusers`;
        return  httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('Content-Range')), // 0-10/10
            // total: [0,9],
        }));
        
    },

    getOne: async (resource, params) => {
        let url = `${apiUrl}/${resource}/${params.id}`
        const response = await fetch (url)
        const json = await response.json()
        return {data: json}
=======
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const url = `${apiUrl}/${resource}/allusers`;

        // const res = await fetch(url)
        // const json = await res.json()
  
        // const data = {
        //     data: json.data.map(resource => ({ ...resource, id: resource.user_id }) ),
        //     total:10
        // return data
        // 
        // } 

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            // data: json.map(resource => ({ ...resource, id: resource.user_id }) ),
            // total: parseInt(headers.get('Content-Range').split('/').pop(), 10),
            total: 10,
        }));
    },

    getOne: async (resource, params) => {
        let url = `${apiUrl}/${resource}/find/${params.id}`
        // let token = ""
        // if (localStorage.getItem("username")){
        //     token =   JSON.parse(localStorage.getItem("username")).token
        // }
        const response = await fetch (url, {
            method:"GET",
            // headers :{
            //     'Authorization': "bearer " + token
            // }, 
        })  
        const json = await response.json()
        console.log(json.data)
        return {data: json.data}
      
>>>>>>> upstream/main
    },

    getMany: (resource, params) => {
        const query = {
<<<<<<< HEAD
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}/many?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.map(resource => ({ ...resource, id: resource.user_id }) ), }));
=======
            filter: JSON.stringify({ user_id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
>>>>>>> upstream/main
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
<<<<<<< HEAD
        // console.log("query", query)
        // const url = `${apiUrl}/${resource}/${params.id}`;
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(url)
        return httpClient(url).then(({ headers, json }) => ({
            data: [json],
=======
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
>>>>>>> upstream/main
            total:10
        }));
    },

    update: async(resource, params) =>{
        let url = `${apiUrl}/${resource}/${params.id}`
<<<<<<< HEAD
        console.log(params.data)
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
=======
        let token = ""
        if (localStorage.getItem("username")){
            token =   JSON.parse(localStorage.getItem("username")).token
        }
        const response = await fetch (url, {
            method:"PUT",
            headers :{
                'Authorization': "bearer " + token
            }, 
            body: JSON.stringify(params.data),
        })  
        const json = await response.json()
        return {data: json}

        // httpClient(`${apiUrl}/${resource}/${params.id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(params.data),
        // }).then(({ json }) => ({ data: json }))
>>>>>>> upstream/main
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
<<<<<<< HEAD
        httpClient(`${apiUrl}/${resource}/createuser`, {
=======
        httpClient(`${apiUrl}/${resource}`, {
>>>>>>> upstream/main
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};