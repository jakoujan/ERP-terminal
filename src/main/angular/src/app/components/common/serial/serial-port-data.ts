import { ISerialPortItem } from './serial-port-item';

export class SerialPortData {
    
    public static BAUDRATES: Array<number> = [
        300,
        600,
        1200,
        2400,
        4800,
        9600,
        19200,
        38400
    ];

    public static DATABITS: Array<number> = [
        5,
        6,
        7,
        8
    ];

    public static PARITY: Array<ISerialPortItem> = [
        { id: 0, description: 'None' },
        { id: 1, description: 'Odd' },
        { id: 2, description: 'Even' },
        { id: 3, description: 'Mark' },
        { id: 4, description: 'Space' }
    ];

    public static STOPBITS: Array<ISerialPortItem> = [
        { id: 1, description: '1' },
        { id: 2, description: '1.5' },
        { id: 3, description: '2' }
    ];

    public static findParity(id: number): ISerialPortItem {
        let parity: ISerialPortItem = null;
        SerialPortData.PARITY.forEach(p => {
            if (p.id === id) {
                parity = p;
                return;
            }
        });
        return parity;
    }

    public static findStopbit(id: number): ISerialPortItem {
        let stopbit: ISerialPortItem = null;
        SerialPortData.STOPBITS.forEach(sb => {
            if (sb.id === id) {
                stopbit = sb;
                return;
            }
        });
        return stopbit;
    }



}
