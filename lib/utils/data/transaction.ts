import {GroupItem} from "@/lib/types/Transaction";

export const keypadData = [
    {id: '001', value: '7'},
    {id: '002', value: '8'},
    {id: '003', value: '9'},
    {id: '004', value: '4'},
    {id: '005', value: '5'},
    {id: '006', value: '6'},
    {id: '007', value: '1'},
    {id: '008', value: '2'},
    {id: '009', value: '3'},
    {id: '010', value: '.'},
    {id: '011', value: '0'},
    {id: '012', value: '<', isBackSpace: true},
]

export const groups: GroupItem[] = [
    {
        key: 'Spent',
        items: [
            {
                key: '0',
                type: 'week'
            },
            {
                key: '1',
                type: 'month',
            }
        ]
    },
    {
        key: 'Revenue',
        items: [
            {
                key: '2',
                type: 'week',
            },
            {
                key: '3',
                type: 'month',
            }
        ]
    },
    {
        key: 'Balance',
        items: [
            {
                key: '4',
                type: 'none',
            }
        ]
    }
]
