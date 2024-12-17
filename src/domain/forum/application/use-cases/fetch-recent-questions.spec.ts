import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository"
import { makeQuestion } from "test/factories/make-question"
import { FetchRechentQuestionsCase } from "./fetch-recent-questions"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRechentQuestionsCase

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRechentQuestionsCase(inMemoryQuestionsRepository)
  })

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 12, 14) })
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 12, 12) })
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 12, 16) })
    )

    const { questions } = await sut.execute({
      page: 1,
    })
    expect(questions).toHaveLength(3)
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 12, 16) }),
      expect.objectContaining({ createdAt: new Date(2024, 12, 14) }),
      expect.objectContaining({ createdAt: new Date(2024, 12, 12) }),
    ])
  })

  it("should be able to paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
