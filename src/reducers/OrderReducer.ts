import { MenuItem } from "../types";

export type OrderActions = 
    {type:'add-item', payload:{item: MenuItem}} |
    {type:'removeItem', payload:{item: MenuItem['id']}}|
    {type:'placeOrder'}


