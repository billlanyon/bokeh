import {AbstractIcon, AbstractIconView} from "models/widgets/abstract_icon"
import * as p from "core/properties"

import "./fontawesome.less"

export class FontAwesomeIconView extends AbstractIconView {
  model: FontAwesomeIcon

  connect_signals(): void {
    super.connect_signals()
    this.connect(this.model.change, () => this.render())
  }

  render(): void {
    super.render()

    this.el.style.display = "inline"
    this.el.style.verticalAlign = "middle"
    this.el.style.fontSize = `${this.model.size}em`

    this.el.classList.add("bk-u-fa")
    this.el.classList.add(`bk-u-fa-${this.model.icon_name}`)

    if (this.model.flip != null)
      this.el.classList.add(`bk-u-fa-flip-${this.model.flip}`)

    if (this.model.spin)
      this.el.classList.add("bk-u-fa-spin")
  }
}

export namespace FontAwesomeIcon {
  export type Attrs = p.AttrsOf<Props>

  export type Props = AbstractIcon.Props & {
    icon_name: p.Property<string>
    size: p.Property<number>
    flip: p.Property<"horizontal" | "vertical" | null>
    spin: p.Property<boolean>
  }
}

export interface FontAwesomeIcon extends FontAwesomeIcon.Attrs {}

export class FontAwesomeIcon extends AbstractIcon {
  properties: FontAwesomeIcon.Props
  __view_type__: FontAwesomeIconView

  constructor(attrs?: Partial<FontAwesomeIcon.Attrs>) {
    super(attrs)
  }

  static {
    this.prototype.default_view = FontAwesomeIconView

    this.define<FontAwesomeIcon.Props>(({Boolean, String, Number, Enum, Nullable}) => ({
      icon_name: [ String, "check" ],
      size:      [ Number, 1 ],
      flip:      [ Nullable(Enum("horizontal", "vertical")) ],
      spin:      [ Boolean, false ],
    }))
  }
}
