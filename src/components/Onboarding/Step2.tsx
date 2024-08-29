import { AccentText, Header1 } from 'components/icons/Text'

export default function () {
  return (
    <div className="max-w-96 mt-16">
      <Header1 className="text-center">
        <p>Daily claim,</p>
        <p>complete tasks,</p>
        <p>and invite friends</p>
      </Header1>

      <AccentText className="flex w-full justify-center text-center mt-5">
        To get points for a ticket to the Major League
      </AccentText>
    </div>
  )
}
