import { AccentText, Header1, SpecialText } from 'components/icons/Text'

export default function () {
  return (
    <div className="max-w-96">
      <Header1 className="text-center">
        <SpecialText
          withShadow
          className="bg-success !py-0 !rounded-2xl -rotate-3"
        >
          Daily claim
        </SpecialText>
        do tasks and invite friends
      </Header1>

      <AccentText className="flex w-full justify-center text-center mt-5">
        To get points for a ticket to the Major League
      </AccentText>
    </div>
  )
}
