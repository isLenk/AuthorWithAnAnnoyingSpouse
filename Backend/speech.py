

def sayAsAngry(lines: str):
    ssml_string = f"""
        <speak version="1.0" xml:lang="en-US"  xmlns:mstts="https://www.w3.org/2001/mstts">
        <voice name="en-US-JaneNeural">
            <mstts:express-as style="angry">
            <prosody rate="x-fast" volume="loud">
            {lines}
            </prosody>
            </mstts:express-as>
        </voice>
        </speak>
    """
    return ssml_string


def sayAsNeutral(lines: str):
    ssml_string = f"""
        <speak version="1.0" xml:lang="en-US"  xmlns:mstts="https://www.w3.org/2001/mstts">
        <voice name="en-US-JaneNeural">
            <mstts:express-as style="default">
            <prosody rate="x-fast" volume="loud">
            {lines}
            </prosody>
            </mstts:express-as>
        </voice>
        </speak>
    """
    return ssml_string