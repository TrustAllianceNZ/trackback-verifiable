import { ApiPromise, WsProvider } from "@polkadot/api";
import axios from "axios";
import { IConnect, IDistributedConnectorOptions, ITrackbackAgentOptions } from "../types";
import { DefaultOptions, DistributedStorageOptions } from "./helpers";

/**
 * TrackBackAgentClass
 * Connects and disconnects RPC to chain
 */
export class Connector implements IConnect {
  private options: ITrackbackAgentOptions;
  private api: Promise<ApiPromise> | null | undefined;

  constructor(options: ITrackbackAgentOptions = DefaultOptions) {
    this.options = options;
  }

  /**
   * Connects to the TrackBack chain
   * @returns Promise<ApiPromise>
   */
  async connect(): Promise<ApiPromise> {
    if (this.api) return this.api;

    const { url, options: other } = this.options;
    const { types, rpc } = other;

    const provider = new WsProvider(url);

    this.api = ApiPromise.create({ provider: provider, types, rpc });
    return this.api;
  }

  /**
   * Disconnects from chain
   */
  async disconnect(): Promise<void> {
    (await this.connect()).disconnect();
    this.api = null;
  }
}

/**
 * IPFS storage connector
 */
export class DecentralisedFileStoreConnector {
  private options: IDistributedConnectorOptions;
  constructor(options = DistributedStorageOptions) {
    this.options = options;
  }

  // TODO: Setup Auth Headers 
  // |TOD: Replace any
  /**
   * 
   * @param cid IPFS Content Identifier
   * @param headers Auth Headers
   * @returns 
   */
  async getData(cid: string, headers:any): Promise<any> {
    return axios.get(cid).then(response => {
      return {
        CID: cid,
        content: response.data
      };
    }).catch( error => {
      return {
        "Error": error,
      }
    });
  }
  /**
   * # TODO: Replace any
   * Create a DID Document.
   * @param data | The following JSON Structure
   * @param headers | Dictionary holds header information
   */
  async postData(data: any, headers: any): Promise<any> {

    let url = this.options.url  + this.options.api + "ipfs/add";
    return axios.post(url, data).then((response:any) => {
      return this.options.decentralisedStoreURL +  response.data["cid"];
    }).catch( error => {
      return {
        "Error": error,
      }
    })

  }
}