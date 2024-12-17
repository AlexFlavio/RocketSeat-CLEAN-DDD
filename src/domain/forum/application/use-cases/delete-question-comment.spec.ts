import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository"
import { makeQuestion } from "test/factories/make-question"
import { DeleteQuestionCommentUseCase } from "./delete-question-comment"
import { makeQuestionComment } from "test/factories/make-question-comment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe("Delete Question Comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it("should be able to delete a question comment", async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })
  it("should not be able to delete another user question comment", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID("author-1"),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)

    await expect(async () => {
      return await sut.execute({
        authorId: "author2",
        questionCommentId: questionComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
  })
})
