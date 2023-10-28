export default function Instruction({ Instructions }) {
    return (
        <>
            <div className="pt-2 px-1">
                {
                    Instructions.map((list) => {
                        return (
                            <li className="Instructions">{list}</li>
                        )
                    })
                }
            </div>
        </>
    )
}