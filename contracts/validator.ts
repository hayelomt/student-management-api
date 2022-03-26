declare module '@ioc:Adonis/Core/Validator' {
  import { Rule } from '@ioc:Adonis/Core/Validator';
  import { UniqueCompoundArg } from 'app/modules/_shared/validation/uniqueCompound';
  import { NotRegisteredArg } from 'app/modules/finance/payment/registration/notRegisteredRule';
  import { FeeNotStagedArgs } from 'app/modules/finance/payment/stagePayment/paymentNotStagedRule';

  export interface Rules {
    uniqueCompound(options: UniqueCompoundArg): Rule; // 👈
    notRegistered(options: NotRegisteredArg): Rule;
    monthFeeNotPaid(): Rule;
    monthTutorialNotPaid(): Rule;
    notSummerPaid(): Rule;
    paymentNotStaged(options: FeeNotStagedArgs): Rule;
  }
}
