import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { FetchQuestionAnswersCase } from "./fetch-question-answers"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersCase

describe("Fetch Questions Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersCase(inMemoryAnswersRepository)
  })

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: "question-1",
    })

    expect(answers).toHaveLength(3)
  })

  it("should be able to paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID("question-1") })
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: "question-1",
    })

    expect(answers).toHaveLength(2)
  })
})
