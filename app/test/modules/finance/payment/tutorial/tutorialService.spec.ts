import test from 'japa';
import TutorialService from 'app/modules/finance/payment/tutorial/tutorialService';
import { PaymentFactory } from '../paymentFactory';
import { TutorialFactory } from './tutorialFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { expect } from 'chai';
import { getCount } from 'app/services/utils';
import Payment from 'app/modules/finance/payment/payment';
import Tutorial from 'app/modules/finance/payment/tutorial/tutorial';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';

const tutorialService = new TutorialService();

transact('TutorialService', () => {
  test('update', async () => {
    const payment = await PaymentFactory.create();
    const fee = await TutorialFactory.merge({
      payment_id: payment.id,
    }).create();

    await tutorialService.update(fee.id, {
      cash: 40,
    });

    const paymentUpdated = await Payment.findOrFail(payment.id);

    expect(paymentUpdated.cash).to.equal(40);
  });

  test('create', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const tutorial = await TutorialFactory.make();

    // console.log(tutorial.serialize());

    const tutorialNew = (await tutorialService.create(
      {
        ...payment.serialize(),
        ...tutorial.serialize(),
      },
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete tutorialNew.id;

    expect(await getCount(Payment)).to.equal(1);
    expect(await getCount(Tutorial)).to.equal(1);
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(tutorialNew, {
      ...payment.serialize(),
      hidden: false,
      ...tutorial.serialize(),
      payment_id: paymentNew.id,
      user_id: 'uid',
      attachment: 1,
      academic_year_id: ay.id,
    });
  });
});
