import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    startDate: vine
      .string()
      .trim()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/),
    endDate: vine
      .string()
      .trim()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/),
  })
)

const messages = {
  'title.required': 'O título é obrigatório',
  'title.minLength': 'O título deve ter no mínimo 6 caracteres',
  'startDate.required': 'A data de início é obrigatória',
  'startDate.regex': 'A data de início deve estar no formato dd/MM/yyyy',
  'endDate.required': 'A data de conclusão é obrigatória',
  'endDate.regex': 'A data de conclusão deve estar no formato dd/MM/yyyy',
}

createTaskValidator.messagesProvider = new SimpleMessagesProvider(messages)
