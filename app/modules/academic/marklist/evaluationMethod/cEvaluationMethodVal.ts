import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CEvaluationMethodVal extends Validator {
  public schema = schema.create({
    evaluation_type_ids: schema.array().members(
      schema.string({}, [
        rules.exists({
          column: 'id',
          table: 'evaluation_types',
        }),
        // rules.unique({
        //   table: 'evaluation_methods',
        //   column: 'evaluation_type_id',
        //   where: {
        //     quarter_id: this.body.quarter_id,
        //     cst_id: this.body.cst_id,
        //   },
        // }),
      ])
    ),
    quarter_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'quarters',
      }),
    ]),
    cst_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'csts',
      }),
    ]),
  });

  public messages = {
    ...this.messages,
    'evaluation_type_ids.*.unique': 'evaluation method already added',
  };
}
