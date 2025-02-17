import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContext } from 'react';
import {
  AppContext,
  OnchainKitComponent,
  TransactionTypes,
} from '../AppProvider';

export function TransactionOptions() {
  const { activeComponent, transactionType, setTransactionType } =
    useContext(AppContext);

  return (
    (activeComponent === OnchainKitComponent.Transaction ||
      activeComponent === OnchainKitComponent.TransactionDefault) && (
      <div className="grid gap-2">
        <Label htmlFor="chain">Transaction Options</Label>
        <Select
          value={transactionType}
          onValueChange={(value) =>
            value ? setTransactionType?.(value as TransactionTypes) : value
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TransactionTypes.Calls}>Calls</SelectItem>
            <SelectItem value={TransactionTypes.Contracts}>
              Contracts
            </SelectItem>
            <SelectItem value={TransactionTypes.CallsPromise}>
              Calls Promise
            </SelectItem>
            <SelectItem value={TransactionTypes.ContractsPromise}>
              Contracts Promise
            </SelectItem>
            <SelectItem value={TransactionTypes.CallsCallback}>
              Calls Callback
            </SelectItem>
            <SelectItem value={TransactionTypes.ContractsCallback}>
              Contracts Callback
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  );
}
