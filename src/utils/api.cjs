import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';


const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  constructor(token) {
    this.token = token || "";
  }

  async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    console.log(this.token);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    console.log(headers);
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    };
  };

  // Individual API routes

  /** Company routes */

  /** Get all companies. */
  async getAllCompanies(search) {
    const url = search ? `companies/?name=${search}` : `companies/`;
    let res = await this.request(url);
    return res.companies;
  };

  /** Get details on a company by handle. */
  async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  };


  /** Job routes */

  /** Get all jobs. */
  async getAllJobs(search) {
    const url = search ? `jobs/?title=${search}` : `jobs/`;
    let res = await this.request(url);
    return res.jobs;
  };


  /** User routes */

  /** attempt login */
  async login(data) {
    const { username, password } = data;
    try {
      let tokenRes = await this.request(`auth/token`, { username, password }, 'post');
      this.token = tokenRes.token;
      let userRes = await this.request(`users/${username}`);
      const data = {
        token: this.token,
        user: { ...userRes.user }
      };
      return data;
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    };
  };

  /** attempt registration */
  async register(data) {
    const { username, password, firstName, lastName, email } = data;
    try {
      let res = await this.request(`auth/register`, { username, password, firstName, lastName, email }, 'post');
      return res;
    } catch (error) {
      throw new Error(`Registration failed: ${error}`);
    };
  };

  /** attempt user info update */
  async update(data) {
    const { username, firstName, lastName, email } = data;
    try {
      let res = await this.request(`users/${username}`, { firstName, lastName, email }, 'patch');
      return res;
    } catch (error) {
      throw new Error(`Update failed: ${error}`);
    };
  };

  /** attempt job application  */
  async apply(data) {
    const { username, id } = data;
    try {
      let res = await this.request(`users/${username}/jobs/${id}`, {}, 'post');
      return res;
    } catch (error) {
      throw new Error(`Application failed: ${error}`);
    };
  };


};

export default JoblyApi;
