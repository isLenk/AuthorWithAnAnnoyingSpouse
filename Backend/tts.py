'''
  For more samples please visit https://github.com/Azure-Samples/cognitive-services-speech-sdk 
'''
# https://play.ht/blog/what-is-ssml/

import azure.cognitiveservices.speech as speechsdk
import speech
import os
from dotenv import load_dotenv

load_dotenv()


# Creates an instance of a speech config with specified subscription key and service region.
speech_key = os.getenv("SPEECH_KEY")
service_region = "eastus"

speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
# Note: the voice setting will not overwrite the voice element in input SSML.
speech_config.speech_synthesis_voice_name = "en-US-JaneNeural"
speech_config.set_profanity(speechsdk.ProfanityOption.Raw)

# use the default speaker as audio output.
speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

def say(text):
  ssml_string = speech.sayAsAngry(text)

  result = speech_synthesizer.speak_ssml_async(ssml_string).get()
  # Check result
  if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
      print("Speech synthesized for text")
  elif result.reason == speechsdk.ResultReason.Canceled:
      cancellation_details = result.cancellation_details
      print("Speech synthesis canceled: {}".format(cancellation_details.reason))
      if cancellation_details.reason == speechsdk.CancellationReason.Error:
          print("Error details: {}".format(cancellation_details.error_details))
