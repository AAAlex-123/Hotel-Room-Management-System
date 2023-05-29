package alexman.hrms.core.network.retrofit

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

internal object HrmsRetrofitInstance {

    var access_token: String? = null

    // --- ENDPOINT FOR DUMMY EXPRESS SERVER --- server not included, also sort of deprecated
    // TODO("delete when done")
    // private const val baseUrl = "http://localhost:8000/"

    // --- ENDPOINT FOR ACTUAL SERVER ---
    private const val baseUrl = "https://f317-2a02-587-b830-1500-6dee-9a1f-4394-148f.ngrok-free.app/api/"

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val client = OkHttpClient.Builder()
        .addInterceptor(AuthorizationHeaderInterceptor())
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

private class AuthorizationHeaderInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()

        // don't add header on /auth path
        if (request.url().pathSegments().contains("auth")) {
            return chain.proceed(request)
        }

        val newRequest = request.newBuilder()
            .header("Authorization", HrmsRetrofitInstance.access_token?.let {
                "Bearer $it"
            } ?: "")
            .build()

        return chain.proceed(newRequest)
    }
}
