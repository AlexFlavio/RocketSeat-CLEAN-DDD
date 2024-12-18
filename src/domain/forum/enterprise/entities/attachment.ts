import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface AttachmentsProps {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentsProps> {
  get title() {
    return this.props.title
  }
  get link() {
    return this.props.link
  }

  static create(props: AttachmentsProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
