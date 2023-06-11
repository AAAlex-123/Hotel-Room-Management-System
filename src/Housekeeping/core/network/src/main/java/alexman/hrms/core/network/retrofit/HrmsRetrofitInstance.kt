package alexman.hrms.core.network.retrofit

import android.util.Log
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import okhttp3.Response
import okhttp3.ResponseBody
import okio.Buffer
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

internal object HrmsRetrofitInstance {

    var access_token: String? = null
        set(value) {
            Log.d("HrmsRetrofitInstance", "access_token set to $value")
            field = value
        }

    private const val baseUrl =
        "https://1aec-2a02-587-b830-1500-1c70-4300-62e6-5d6b.ngrok-free.app/api/"

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val client = OkHttpClient.Builder()
        .addInterceptor(HrmsAuthHeaderInterceptor())
        .addInterceptor(HrmsLoggingInterceptor())
        .build()

    val api: HrmsApi by lazy {
        Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .client(client)
            .build()
            .create(HrmsApi::class.java)
    }
}

private class HrmsAuthHeaderInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {

        val request = chain.request()

        val modifiedRequest = with(request) {

            // don't add header on /auth path
            if ("auth" in this.url().pathSegments()) {
                return@with this
            }

            return@with this.newBuilder()
                .header("Authorization", HrmsRetrofitInstance.access_token?.let {
                    "Bearer $it"
                } ?: "")
                .build()
        }

        return chain.proceed(modifiedRequest)
    }
}

private class HrmsLoggingInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()

        val newRequest = with(request) {

            val method = method()
            val url = url()
            val headers = headers()
            val contentType = body()?.contentType()
            val content = body()?.let { body ->
                if (!body.isOneShot) {
                    with(Buffer()) {
                        body.writeTo(this)
                        readUtf8()
                    }
                } else {
                    ""
                }
            } ?: ""

            Log.i(
                "HrmsRetrofitInterceptor", "--> HTTP $method $url"
                        + "\n\theaders = $headers" // $headers adds a newline
                        + "\tbody = $content"
            )

            return@with this.newBuilder()
                .method(
                    method,
                    if (method == "GET") null else
                        RequestBody.create(
                            contentType,
                            content,
                        )
                )
                .build()
        }

        val response = chain.proceed(newRequest)

        return with(response) {

            val code = code()
            val contentType = body()?.contentType()
            val content = body()?.string() ?: ""

            Log.i(
                "HrmsRetrofitInterceptor",
                "<-- RESPONSE code = $code, responseBody = $content"
            )

            return@with this.newBuilder()
                .body(
                    ResponseBody.create(
                        contentType,
                        content,
                    )
                )
                .build()
        }
    }
}
