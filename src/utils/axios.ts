import axios, { AxiosResponse } from "axios";

const apiServer: string = 'http://ec2-3-36-98-19.ap-northeast-2.compute.amazonaws.com:8080';

export const customAxios = axios.create({
    baseURL: apiServer
});

export const fetcher = async (url: string): Promise<any> => {
    const response: AxiosResponse = await customAxios.get(url);
    return response.data;
};

export const tokenFetcher = (token: string) => {
    return (url: string) => {
        return customAxios
            .get(url, { headers: { 'Authorization': `Bearer ${token}` } })
            .then((response: AxiosResponse) => response.data);
    };
};

export const fetcherWithToken = async (token: string, url: string): Promise<any> => {
    const response: AxiosResponse = await customAxios.get(url, 
        { headers: { 'Authorization': `Bearer ${token}` } 
    });
    return response;
};

export const postWithToken = async (token: string, url: string, data: any): Promise<any> => {
    const response: AxiosResponse = await customAxios.post(url, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response;
};

export const putWithToken = async (token: string, url: string, data: any): Promise<any> => {
    const response: AxiosResponse = await customAxios.put(url, data, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response;
};

export const deleteWithToken = async (token: string, url: string): Promise<any> => {
    const response: AxiosResponse = await customAxios.delete(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response;
};
