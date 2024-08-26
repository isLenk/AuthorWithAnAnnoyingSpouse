'''
  For more samples please visit https://github.com/Azure-Samples/cognitive-services-speech-sdk 
'''
# https://play.ht/blog/what-is-ssml/

import azure.cognitiveservices.speech as speechsdk
import speech
# Creates an instance of a speech config with specified subscription key and service region.
speech_key = "d50c93f8aecb4a17b95d01d325161877"
service_region = "eastus"

speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
# Note: the voice setting will not overwrite the voice element in input SSML.
speech_config.speech_synthesis_voice_name = "en-US-JaneNeural"
speech_config.set_profanity(speechsdk.ProfanityOption.Raw)

# text = "Hi, this is Jane"
# Define the SSML with the desired speech style
ssml_string = speech.sayAsAngry("Hi, this is Jane. What the hell are you doing?")
# use the default speaker as audio output.
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

result = speech_synthesizer.speak_ssml_async(ssml_string).get()
# Check result
if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("Speech synthesized for text")
elif result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print("Speech synthesis canceled: {}".format(cancellation_details.reason))
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        print("Error details: {}".format(cancellation_details.error_details))
# result = speech_synthesizer.speak_text_async(text).get()
# # Check result
# if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
#     print("Speech synthesized for text [{}]".format(text))
# elif result.reason == speechsdk.ResultReason.Canceled:
#     cancellation_details = result.cancellation_details
#     print("Speech synthesis canceled: {}".format(cancellation_details.reason))
#     if cancellation_details.reason == speechsdk.CancellationReason.Error:
#         print("Error details: {}".format(cancellation_details.error_details))

