import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { makeQuestion } from "test/factories/make-question"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository
    )
  })

  it("should be able to comment on question", async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "test Comment",
    })

    expect(questionComment.id).toBeTruthy()
    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      "test Comment"
    )
    expect(inMemoryQuestionCommentsRepository.items[0].id).toEqual(
      questionComment.id
    )
  })
})
