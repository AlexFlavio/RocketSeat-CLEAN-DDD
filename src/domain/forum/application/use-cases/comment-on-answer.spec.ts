import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswersRepository
    )
  })

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "test Comment",
    })

    expect(answerComment.id).toBeTruthy()
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "test Comment"
    )
    expect(inMemoryAnswerCommentsRepository.items[0].id).toEqual(
      answerComment.id
    )
  })
})
