import { ISerialPortItem } from "./serial-port-item";

export interface ISerialPortConfig {
    name: string;
    baudRate: number;
    parity: ISerialPortItem;
    dataBits: number;
    stopBits: ISerialPortItem;
}